package steps;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;
import pagesobject.front.creacuenta.CreaCuentaPage;
import starter.executetest.BaseWrapper;

public class CreaCuentaStep extends PageObject {

    CreaCuentaPage creaCuentaPage;

    @Step

    public void abrirAdmonUser() throws InterruptedException {
        openUrl("http://127.0.0.1:5173/administracionusers/");
        Thread.sleep(4000);
    }

    @Step
    public void validacionCreaCuenta() throws InterruptedException {
        creaCuentaPage.validacionCreaCuenta();
    }

    public void confirmacionCreaCuenta() throws InterruptedException {
        creaCuentaPage.confirmacionCreaCuenta();
    }

    public void verificacionCreaUsuario() throws InterruptedException {
        this.abrirAdmonUser();
        Thread.sleep(10000);
        creaCuentaPage.verificacionCreaUsuario();
}
}