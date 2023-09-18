#Autor: Wendy Aldana
  #Usario: wenaldana16@hotmail.com
Feature: Inicio de sesion aplicativo HomeOff

Background:
    Given Que se tiene acceso al aplicativo web
    When Ingrese al url
    Then Sera direccionado al home de HomeOff

  @Regresion @Login
  @Test3
  Scenario: Login a la web de HomeOff rol admin
    Given Que se tiene un usuario existente
    When Se ingrese en el login y se ingresen los datos del correo "picapiedra@gmail.com" y contrasena "Papanatas.1"
    Then al dar clic en Acceso, debe permitir ingresar correctamente