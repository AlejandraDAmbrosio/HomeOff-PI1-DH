package pagesobject.front.iniciarsesion;

import net.serenitybdd.core.pages.PageObject;
import org.junit.Assert;
import starter.executetest.BaseWrapper;

public class IniciarSesionPage {


    String btoCreaCuenta = "return document.querySelector(\"#root > div.header > nav > ul > div > li:nth-child(1) > div > a > div\")";
    String campoNombre = "return document.querySelector(\"#nombre\")";
    String campoApellido = "return document.querySelector(\"#apellido\")";
    String campoEmail = "return document.querySelector(\"#email\")";
    String campoConfirmacion = "return document.querySelector(\"#confirmaremail\")";
    String campoPassword = "return document.querySelector(\"#password\")";
    String campoConfirPassword = "return document.querySelector(\"#confirmarpassword\")";
    String btoFinalizaCreacion = "return  document.querySelector(\"#root > div.pagina-formulario-alta > form > div > button\")";
    String mensajeCreacion = "return document.querySelector(\"#root > div.pagina-formulario-alta > form > h5\")";


    BaseWrapper baseWrapper = new BaseWrapper();

    public void validacionLogin() throws InterruptedException {
        String actual = baseWrapper.FactoryShadowRootGetText(btoCreaCuenta);
        String esperado = "Crear Cuenta";
        Assert.assertEquals(esperado,actual);
        baseWrapper.ScrollDownPage();
        Thread.sleep(5000);
        baseWrapper.ScrollUpPage();
        Thread.sleep(5000);
        baseWrapper.ClickShadowRootObject(btoCreaCuenta);
        Thread.sleep(5000);
        baseWrapper.FactoryShadowRootSendKeys(campoNombre,"Byron");
        Thread.sleep(5000);
        baseWrapper.FactoryShadowRootSendKeys(campoApellido,"Pedraza");
        Thread.sleep(5000);
        baseWrapper.FactoryShadowRootSendKeys(campoEmail,"byron86@hotmail.com");
        Thread.sleep(5000);
        baseWrapper.FactoryShadowRootSendKeys(campoConfirmacion,"byron86@hotmail.com");
        Thread.sleep(5000);
        baseWrapper.FactoryShadowRootSendKeys(campoPassword,"HTo2gota123*");
        Thread.sleep(5000);
        baseWrapper.FactoryShadowRootSendKeys(campoConfirPassword,"HTo2gota123*");
        Thread.sleep(5000);
        baseWrapper.ScrollDownPage();
        Thread.sleep(3000);
        baseWrapper.ClickShadowRootObject(btoFinalizaCreacion);
        Thread.sleep(5000);
        String resultadoCreacionActual = baseWrapper.FactoryShadowRootGetText(mensajeCreacion);
        String resultadoCreacionesperado = "Gracias !! Te has registrado como usuario de HomeOFF!!";
        Assert.assertEquals(resultadoCreacionesperado,resultadoCreacionActual);

    }
}
