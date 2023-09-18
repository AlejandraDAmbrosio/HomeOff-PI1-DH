package steps.front;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;
import pagesobject.front.creacuenta.CreaCuentaPage;
import pagesobject.front.home.HomePage;
import starter.executetest.BaseWrapper;

public class CreaCuentaStep extends PageObject {

    CreaCuentaPage creaCuentaPage;
    HomePage homePage;
    @Step
    public void ingresoOpcionCrearUsuario() throws InterruptedException {
        homePage.ingresoOpcionCrearUsuario();
    }

    @Step
    public void abrirAdmonUser() throws InterruptedException {
        openUrl("http://127.0.0.1:5173/administracionusers/");
        Thread.sleep(4000);
    }

    @Step
    public void validacionCreaCuenta() throws InterruptedException {
        creaCuentaPage.validacionCreaCuenta();
    }

    @Step
    public void confirmacionCreaCuenta() throws InterruptedException {
        creaCuentaPage.confirmacionCreaCuenta();
    }

    @Step
    public void verificacionCreaUsuario() throws InterruptedException {
        this.abrirAdmonUser();
        Thread.sleep(10000);
        creaCuentaPage.verificacionCreaUsuario();
    }


}