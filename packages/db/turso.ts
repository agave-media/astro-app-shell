import { createClient } from "@libsql/client";

export const turso = createClient({
    url: import.meta.env.PUBLIC_TURSO_DATABASE_URL,
    authToken: import.meta.env.PUBLIC_TURSO_AUTH_TOKEN,
});

export const fetchProducts = async () => {
    const productsResponse = await turso.execute("SELECT * FROM Producto LIMIT 20");
    return productsResponse.rows;
}