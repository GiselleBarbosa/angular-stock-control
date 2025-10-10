import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { environments } from 'src/environments/environments';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, CookieService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve cadastrar um novo usuário', () => {
    const mockUser = {
      name: 'Joao Silva',
      email: 'teste@teste.com',
      password: '123456'
    };

    const mockResponse = {
      id: '1',
      name: 'Joao Silva',
      email: 'teste@teste.com'
    };

    service.signupUser(mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environments.API_URL}/user`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve autenticar um usuário existente', () => {
    const mockAuth = {
      email: 'teste@teste.com',
      password: '123456'
    };

    const mockResponse = {
      id: '1',
      name: 'Joao Silva',
      email: 'teste@teste.com',
      token: 'nbvgfcvbcsdqeBbnmnmjnhjvcffdxxszszedfFvvBVbn'
    };

    service.authUser(mockAuth).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environments.API_URL}/auth`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});