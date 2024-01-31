export class Crypto
{
   public static async encrypt(str:string) : Promise<string>
   {
      let encdr:TextEncoder = new TextEncoder();
      let data:Uint8Array = encdr.encode(str);

      let buf:ArrayBuffer = await crypto.subtle.digest('SHA-256',data);
      let numbers:number[] = Array.from(new Uint8Array(buf));
      let hex:string = numbers.map(byte => byte.toString(16).padStart(2,'0')).join('');

      return(hex);
   }
}