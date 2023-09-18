package pagesobject.front.home;

import net.serenitybdd.core.pages.PageObject;
import org.junit.Assert;
import starter.executetest.BaseWrapper;

public class HomePage extends PageObject {

    String logo = "return document.querySelector(\"#root > div.header > nav > ul > li > a > div > img\")";
    String btoCreaCuenta = "return document.querySelector(\"#root > div.header > nav > ul > div > li:nth-child(1) > div > a > div\")";
    BaseWrapper baseWrapper = new BaseWrapper();

    public void validacionLogo() throws InterruptedException {
        baseWrapper.FactoryShadowRootObjectVisibility(logo);
    }

    public void validacionHome() throws InterruptedException {
        String actual = baseWrapper.FactoryShadowRootGetText(btoCreaCuenta);
        String esperado = "Crear Cuenta";
        Assert.assertEquals(esperado,actual);
        baseWrapper.ScrollDownPage();
        Thread.sleep(5000);
        baseWrapper.ScrollUpPage();
        Thread.sleep(5000);

    }
}
