#Autor: Wendy Aldana
  #Usario: wenaldana16@hotmail.com
Feature: Crear cuenta aplicativo HomeOff

  Background:
    Given Que se tiene acceso al aplicativo web
    When Ingrese al url
    Then Sera direccionado al home de HomeOff

  @CreaCuenta

  Scenario: Creacion cuenta usuarios
    Given Que se quiere crear un usuario para navegar
    When se ingrese la informacion de los datos requeridos para creacion de cuenta
    Then Se debe generar un mensaje indicando que la cuenta se creo correctamente
    And al consultar en la administracion de usuario se debe visualizar la informacion del usuario creado