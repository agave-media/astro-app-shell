export interface Producto {
    id : string;
    nombre : string;
    descripcion? : string;
    categoria? : string;
    subcategoria? : string;
    stockActual? : number;
    stockMinimo? : number;
    costo? : number;
    precioPublico? : number;
    precioMayorista? : number;
    precioFF? : number;
    sku? : string;
    marca? : string;
    codigoDeBarras : number;
    fabricacionLote? : string;
    caducidadLote? : string;
    lote? : string;
    recetaMedica : boolean;
    impuestos : boolean;
    catalogoEnLinea : boolean;
    claveSAT? : string;
    iva? : number;
    ieps? : number;
    identificador? : string;
    unidad? : string;
    variantes : Variante[];
    imagen? : string;
}

export interface Variante {
    id : string;
    nombre : string;
    tipo : string;
    costo : number;
    precioPublico? : number;
    precioMayorista? : number;
    precioFF? : number;
    producto? : Producto;
    id_producto? : string;
}