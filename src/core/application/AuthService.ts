import { AuthRepository } from '../infrastructure/repository/AuthRepository';

export class AuthService {
  private _repository: AuthRepository;

  constructor() {
    this._repository = new AuthRepository();
  }

  async signin(email: string, password: string): Promise<void> {
    await this._repository
      .signin(email, password)
      .then((response) => {
        const { token } = response;
        window.localStorage.setItem('access_token', token);
      })
      .catch((err) => console.error(err));
  }

  async register(
    firstName: string,
    lastName: string,
    dni: string,
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<any> {
    return await this._repository.register(firstName, lastName, dni, email, phoneNumber, password);
  }

  async findUsers(): Promise<any> {
    return await this._repository.findUsers();
  }
}

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVVE5GUlNGIiwic3ViIjoiQ3R6VXNlciIsImlkIjoxLCJpYXQiOjE3MjQxOTU1MzcsImV4cCI6MTcyNjc4NzUzNywianRpIjoiNDc2MTJlYjYtNTA0Ni00YjU1LTkxMDAtZTVkNjYzODU5NzZhIn0.HeBQtqoE5AgzJh3xcJSVoyjTiEACtbcKhHXw-A1ZLQ0",
//   "admUser": {
//       "tsi": "2024-06-24T17:35:10.000-0300",
//       "tsu": "2024-08-20T20:04:36.000-0300",
//       "id": 1,
//       "firstName": "Juan Jose",
//       "lastName": "Perez",
//       "dni": "20000000",
//       "email": "jjperez@example.com",
//       "phoneNumber": "3564000000",
//       "tokenWebAccess": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVVE5GUlNGIiwic3ViIjoiQ3R6VXNlciIsImlkIjoxLCJpYXQiOjE3MjQxOTUwNzYsImV4cCI6MTcyNjc4NzA3NiwianRpIjoiNmNjZmM0NjYtZDE0ZC00NTI1LWIxNmYtOWM5MDc2YWI3YzViIn0.mjZfY9Mc9ooanKqF1OO-t7Sdh_4y8AaVHZ_xxQ09yA0",
//       "lastAccessDate": "2024-08-20T20:04:37.000-0300",
//       "fixed": false,
//       "enabled": true,
//       "deleted": false,
//       "configuraciones": {
//           "empty": true
//       },
//       "root": true
//   },
//   "moduleList": [
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 2,
//           "code": "MAIN",
//           "moduleType": "NATIVO_INTERNO",
//           "name": "Principal",
//           "uiOrder": 0,
//           "configuraciones": {
//               "description": "",
//               "linkUrl": "",
//               "icon": {
//                   "prefix": null,
//                   "name": null,
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 3,
//           "code": "BICIS",
//           "moduleType": "NATIVO_INTERNO",
//           "name": "Bicicletas urbanas",
//           "uiOrder": 1,
//           "configuraciones": {
//               "description": "Préstamo y devolución de bicicletas.",
//               "linkUrl": null,
//               "icon": {
//                   "prefix": "fas",
//                   "name": "bicycle",
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 4,
//           "code": "ESTMED",
//           "moduleType": "NATIVO_INTERNO",
//           "name": "Estacionamiento medido",
//           "uiOrder": 1,
//           "configuraciones": {
//               "description": "",
//               "linkUrl": "",
//               "icon": {
//                   "prefix": null,
//                   "name": null,
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 6,
//           "code": "TURNOSWEB",
//           "moduleType": "LINK_URL",
//           "name": "Turnos Web",
//           "uiOrder": 5,
//           "configuraciones": {
//               "description": "Solicite online los turnos para sus trámites",
//               "linkUrl": "https://drt.sanfrancisco.gov.ar/turnosweb",
//               "icon": {
//                   "prefix": "fas",
//                   "name": "calendar-check",
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 7,
//           "code": "CIUDADEVENTOS",
//           "moduleType": "LINK_URL",
//           "name": "Ciudad de Eventos",
//           "uiOrder": 1,
//           "configuraciones": {
//               "description": "Próximos eventos en la ciudad.",
//               "linkUrl": "https://www.sanfrancisco.gov.ar/eventos",
//               "icon": {
//                   "prefix": "fas",
//                   "name": "calendar-days",
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 8,
//           "code": "MULTAS",
//           "moduleType": "LINK_URL",
//           "name": "Multas",
//           "uiOrder": 5,
//           "configuraciones": {
//               "description": "Verifique si tiene multas pendientes.",
//               "linkUrl": "https://drt.sanfrancisco.gov.ar/multas/infracciones/buscar",
//               "icon": {
//                   "prefix": "fas",
//                   "name": "file-invoice-dollar",
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 9,
//           "code": "EL103",
//           "moduleType": "LINK_URL",
//           "name": "103",
//           "uiOrder": 1,
//           "configuraciones": {
//               "description": "Reclamos de la ciudad.",
//               "linkUrl": "https://reclamos.sanfrancisco.gov.ar",
//               "icon": {
//                   "prefix": "fas",
//                   "name": "file-invoice-dollar",
//                   "path": null
//               }
//           },
//           "role": null
//       },
//       {
//           "tsi": null,
//           "tsu": null,
//           "id": 10,
//           "code": "CEDULONES",
//           "moduleType": "LINK_URL",
//           "name": "Cedulones",
//           "uiOrder": 1,
//           "configuraciones": {
//               "description": "Consulte los cedulones",
//               "linkUrl": "https://drt.sanfrancisco.gov.ar/munisfco/",
//               "icon": {
//                   "prefix": "fas",
//                   "name": "file-invoice-dollar",
//                   "path": null
//               }
//           },
//           "role": null
//       }
//   ]
// }
