package steps.front;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;
import pagesobject.front.iniciarsesion.IniciarSesionPage;

public class InicioSesionStep extends PageObject {

    IniciarSesionPage iniciarSesionPage;

    @Step
    public void ingresoOpcionInicioSesion() throws InterruptedException {
        iniciarSesionPage.ingresoOpcionInicioSesion();
    }

    @Step
    public void ingresoUsuarioYContrasena(String string, String string2) throws InterruptedException {
        iniciarSesionPage.ingresoUsuarioYContrasena(string,string2);
    }
    @Step
    public void validacionAccesoAdmin() throws InterruptedException {
        iniciarSesionPage.validacionAccesoAdmin();
    }
}
