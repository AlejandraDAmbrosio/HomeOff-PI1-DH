package pagesobject.front.home;

import net.serenitybdd.core.pages.PageObject;
import org.junit.Assert;
import starter.executetest.BaseWrapper;

public class HomePage extends PageObject {

    String logo = "return document.querySelector(\"#root > div.header > nav > ul > li > a > div > img\")";
    String btoCreaCuenta = "return document.querySelector(\"#root > section:nth-child(2) > div:nth-child(1) > div\")";
    String botonUser = "return document.querySelector(\"#root > div.header > nav > ul > div > li.account-menu > div > div > button > div > div > svg\")";
    String botonCrearCuenta = "return document.querySelector(\"#account-menu > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiMenu-paper.MuiPopover-paper.MuiMenu-paper.css-o19qus > ul > li:nth-child(2) > a\")";
    BaseWrapper baseWrapper = new BaseWrapper();

    public void validacionLogo() throws InterruptedException {
        baseWrapper.FactoryShadowRootObjectVisibility(logo);
    }

    public void validacionHome() throws InterruptedException {
        String actual = baseWrapper.FactoryShadowRootGetText(btoCreaCuenta);
        String esperado = "Oportunidades Únicas";
        Assert.assertEquals(esperado,actual);
        baseWrapper.ScrollDownPage();
        Thread.sleep(5000);
        baseWrapper.ScrollUpPage();
        Thread.sleep(5000);

    }

    public void ingresoOpcionCrearUsuario() throws InterruptedException {
        Thread.sleep(2000);
        baseWrapper.ClickShadowRootObject(botonUser);
        Thread.sleep(2000);
        baseWrapper.ClickShadowRootObject(botonCrearCuenta);
        Thread.sleep(2000);
    }
}
