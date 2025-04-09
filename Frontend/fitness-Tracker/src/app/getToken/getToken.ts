import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string){
    const decoded: any = jwtDecode(token);
    return decoded.id; 
}