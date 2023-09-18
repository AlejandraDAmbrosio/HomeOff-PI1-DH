#Autor: Wendy Aldana
  #Usario: wenaldana16@hotmail.com
Feature: Inicio de sesion aplicativo HomeOff

Background:
    Given Que se tiene acceso al aplicativo web
    When Ingrese al url
    Then Sera direccionado al home de HomeOff

  @Login

  Scenario: Login a la web de HomeOff
    Given Que se tiene un usuario existente
    When Se ingrese en el login y se ingresen los datos del usuario creado
    Then al dar clic en Acceso, debe permitir ingresar correctamente