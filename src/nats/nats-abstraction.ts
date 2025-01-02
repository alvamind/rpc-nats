import { connect, NatsConnection } from 'nats';
import { getAllImplementedInterfaces, getAllInterfaceMethods } from './nats-scanner';
interface RPCHandler<T, R> {
  (data: T): Promise<R>;
}
export class NATSAbstraction {
  private nc?: NatsConnection;
  private handlers = new Map<string, RPCHandler<any, any>>();
  private isConnected = false;
  constructor(private server: string) {}

  private async ensureConnection() {
    if (!this.isConnected) {
      await this.connect();
    }
  }

  async connect() {
    if (!this.isConnected) {
      this.nc = await connect({ servers: this.server });
      this.isConnected = true;
      console.log(`[NATS] Connected to ${this.server}`);
      this.nc.closed().then(() => {
        console.log('[NATS] Connection closed');
        this.isConnected = false;
      });
    }
  }
  async call<T, R>(subject: string, data: T): Promise<R> {
    await this.ensureConnection();

    try {
      const encodedData = new TextEncoder().encode(JSON.stringify(data));
      const response = await this.nc!.request(subject, encodedData, {
        timeout: 10000, // Increase timeout to 10 seconds
      });
      const decodedData = new TextDecoder().decode(response.data);
      return JSON.parse(decodedData) as R;
    } catch (error) {
      console.error(`[NATS] Error calling ${subject}:`, error);
      throw error;
    }
  }
  async register<T, R>(subject: string, handler: RPCHandler<T, R>) {
    await this.ensureConnection();

    if (this.handlers.has(subject)) {
      console.warn(`[NATS] Handler already registered for subject: ${subject}`);
      return;
    }

    console.log(`[NATS] Registering handler for ${subject}`);
    this.handlers.set(subject, handler);

    const subscription = this.nc!.subscribe(subject);
    (async () => {
      for await (const msg of subscription) {
        try {
          const decodedData = new TextDecoder().decode(msg.data);
          const data = JSON.parse(decodedData);
          const result = await handler(data);
          const response = new TextEncoder().encode(JSON.stringify(result));
          msg.respond(response);
        } catch (error) {
          console.error(`[NATS] Error processing message for ${subject}:`, error);
          const errorResponse = new TextEncoder().encode(JSON.stringify({ error: (error as Error).message }));
          msg.respond(errorResponse);
        }
      }
    })().catch((err) => console.error(`[NATS] Subscription error:`, err));
  }
  async registerAll(controller: any) {
    const interfaces = getAllImplementedInterfaces(controller);
    for (const interfaceClass of interfaces) {
      const methods = getAllInterfaceMethods(interfaceClass);
      for (const { key, subject } of methods) {
        try {
          await this.register(subject, async (data: any) => {
            // console.log(`[NATS] Handler ${subject} called`); // HAPUS LOG INI
            return controller[key](data);
          });
        } catch (e) {
          console.error(`[NATS] Failed to register handler for ${subject} `, e);
        }
      }
    }
  }
  close() {
    if (this.nc) {
      this.nc.close();
    }
  }
}
