    // src/common/exceptions/custom-error.exception.ts
    export class CustomError extends Error {
        constructor(message: any) {
            if(message instanceof Error){
                 super(message.message);
                 this.name = message.name
                 this.stack = message.stack
            } else {
               super(message);
               this.name = 'CustomError'
            }
        }
    }
