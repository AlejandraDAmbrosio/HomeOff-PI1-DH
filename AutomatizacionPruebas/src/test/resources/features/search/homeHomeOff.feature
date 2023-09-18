#Autor: Wendy Aldana
  #Usario: wenaldana16@hotmail.com
Feature: Inicio de sesion aplicativo HomeOff

  @Regresion @Inicio
  @Test1
  Scenario: Ingreso a la web de HomeOff
    Given Que se tiene acceso al aplicativo web
    When Ingrese al url
    Then Sera direccionado al home de HomeOff
