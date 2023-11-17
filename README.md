# SMG3 Staffing

Herramienta de gestion de staff para proyectos de Arbusta. Esta herramienta te permite administrar proyectos, asignarles determinado staff a los mismos, ver y descargar sus propias descripciones.

## Funcionalidades

Las funcionalidades de la aplicacion se corresponden con 2 tipos de usuarios:

### Admin

- CRUD de proyectos
- Asignación de staff a determinado proyecto
- Creación y eliminación de usuarios (Usuarios Pm que pueden utilizar la app).

### Pm

- Visualización de:
  - Sus proyectos con su respectivo staff o equipo
  - Todo el staff y su disponibilidad.
  - Su staff en particular
- Descarga de distintas informaciones relacionadas con el/los proyecto/s y/o con el staff disponible.

## DER

[Diagrama entidad - relacion de la BBDD](https://www.figma.com/file/6iBUa380V33Tx12wYT94dv/DER?type=design&node-id=0%3A1&mode=design&t=kI2PT3pNnspK8mx2-1)

## Diseño

[Diseño de las pantallas o vistas de la aplicación](https://www.figma.com/file/ok4PCnlEG7lqLcyhUhZKI7/Staffing?type=design&node-id=0%3A1&mode=design&t=TgcW3aYcrI2KupLs-1)

## Como utilizar la aplicación

1. Instalar las dependencias con `npm install` en la carpeta `client` y en la carpeta `server`.
2. Crear una conexión en SQL Server.
3. Crear un archivo `.env` en la carpeta server y configurar los parámetros de conexión:

```
  USER = usuario
  PASSWORD = contraseña
  SERVER = nombre del servidor
  DATABASE = nombre de la base de datos
```

4. Ejecutar SQL server y crear las tablas que se encuentran en `server/db/staffing.sql`.
5. Luego de crear las tablas iniciar el servidor con `npm run start` , de esta forma se crea el usuario admin.
6. Hacer las inserciones a las tablas correspondientes y ejecutar los SP.
7. Ir en la carpeta `client` y iniciar el cliente con `npm run dev`.
8. Usar la aplicación :)
