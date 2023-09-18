package pagesobject.front.iniciarsesion;

import net.serenitybdd.core.pages.PageObject;
import org.junit.Assert;
import starter.executetest.BaseWrapper;

public class IniciarSesionPage extends PageObject {

    String btoUser = "return document.querySelector(\"#root > div.header > nav > ul > div > li.account-menu > div > div > button > div > div > svg\")";
    String btoUserAdmin = "return document.querySelector(\"#root > div.header > nav > ul > div > li > div > div > button > div > div\")";
    String btoPanelAdmin = "return document.querySelector(\"#account-menu > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiMenu-paper.MuiPopover-paper.MuiMenu-paper.css-o19qus > ul > a:nth-child(5) > li\")";
    String btoInicioSesion = "return document.querySelector(\"#account-menu > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiMenu-paper.MuiPopover-paper.MuiMenu-paper.css-o19qus > ul > li:nth-child(1)\")";
    String tituloInicio = "return document.querySelector(\"body > div.MuiModal-root.css-8ndowl > div:nth-child(3) > div > div > p\")";
    String usario = "return document.querySelector(\"#email\")";
    String contrasena = "return document.querySelector(\"#password\")";
    String btoAcceso = "return document.querySelector(\"body > div.MuiModal-root.css-8ndowl > div:nth-child(3) > div > div > div.MuiFormControl-root.css-13pvilf > div > button\")";
    BaseWrapper baseWrapper = new BaseWrapper();

    public void ingresoOpcionInicioSesion() throws InterruptedException {
        Thread.sleep(1000);
        baseWrapper.ClickShadowRootObject(btoUser);
        Thread.sleep(1000);
        baseWrapper.ClickShadowRootObject(btoInicioSesion);
        Thread.sleep(1000);
        Assert.assertEquals("Inicia sesión ahora", baseWrapper.FactoryShadowRootGetText(tituloInicio));
    }

    public void ingresoUsuarioYContrasena(String string, String string2) throws InterruptedException {
        baseWrapper.FactoryShadowRootSendKeys(usario, string);
        Thread.sleep(1000);
        baseWrapper.FactoryShadowRootSendKeys(contrasena, string2);
        Thread.sleep(1000);
        baseWrapper.ClickShadowRootObject(btoAcceso);
        Thread.sleep(1000);
    }

    public void validacionAccesoAdmin() throws InterruptedException {
        baseWrapper.ClickShadowRootObject(btoUserAdmin);
        Thread.sleep(1000);
        Assert.assertEquals("Panel Administrador", baseWrapper.FactoryShadowRootGetText(btoPanelAdmin));
        Thread.sleep(1000);
    }
}
