#Autor: Wendy Aldana
  #Usario: wenaldana16@hotmail.com
Feature: Test modulo panel Admin

  Background:
    Given Que se tiene acceso al aplicativo web
    When Ingrese al url
    Then Sera direccionado al home de HomeOff
    Given Que se tiene un usuario existente
    When Se ingrese en el login y se ingresen los datos del correo "picapiedra@gmail.com" y contrasena "Papanatas.1"
    Then al dar clic en Acceso, debe permitir ingresar correctamente

  @Regresion @PanelAdmin
  @Test4
  Scenario: Validacion Panel Admin
    Given Que el admin ya se encuentra autenticad
    When Selecciona la opcion panel admin
    Then visualiza las opciones del administrador

  @Regresion @PanelAdmin
  @Test5
  Scenario: Validacion listar producto
    Given Que el admin ya se encuentra autenticad
    When Selecciona la opcion panel admin
    Then visualiza las opciones del administrador
    Given Que el admin ya se encuentra en panael admin
    When Selecciona la opcion listar producto
    Then visualiza los productos

  @Regresion @PanelAdmin
  @Test6
  Scenario: Validacion agregar producto
    Given Que el admin ya se encuentra autenticad
    When Selecciona la opcion panel admin
    Then visualiza las opciones del administrador
    Given Que el admin ya se encuentra en panael admin
    When Selecciona la opcion agregar producto
    Then visualiza agregar producto

  @Regresion @PanelAdmin
  @Test7
  Scenario: Validacion administrar caracteristica
    Given Que el admin ya se encuentra autenticad
    When Selecciona la opcion panel admin
    Then visualiza las opciones del administrador
    Given Que el admin ya se encuentra en panael admin
    When Selecciona la opcion administrar caracteristica
    Then visualiza las caracteristicas

