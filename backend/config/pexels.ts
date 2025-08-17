import { createClient } from 'pexels';
if (!process.env.PEXELS_API_KEY) throw new Error("No pexels Api key") 
    
export const pexels_client = createClient(process.env.PEXELS_API_KEY);
