package steps.front;

import net.thucydides.core.annotations.Step;
import pagesobject.front.paneladmin.PanelAdminPage;

public class PanelAdminStep {

    PanelAdminPage panelAdminPage;
    @Step
    public void validacionAutenticadoAdmin() throws InterruptedException {
        panelAdminPage.validacionAutenticadoAdmin();
    }
    @Step
    public void seleccionOpcionAdmin() throws InterruptedException {
        panelAdminPage.seleccionOpcionAdmin();
    }
    @Step
    public void validacionOpcionesAdmin() throws InterruptedException {
        panelAdminPage.validacionOpcionesAdmin();
    }
    @Step
    public void ValidacionAdmin() throws InterruptedException {
        panelAdminPage.ValidacionAdmin();
    }
    @Step
    public void seleccionarOpcionListaProductos() throws InterruptedException {
        panelAdminPage.seleccionarOpcionListaProductos();
    }
    @Step
    public void visualizaLosProductos() throws InterruptedException {
        panelAdminPage.visualizaLosProductos();
    }
    @Step
    public void seleccionarOpcionAgregarProductos() throws InterruptedException {
        panelAdminPage.seleccionarOpcionAgregarProductos();
    }
    @Step
    public void visualizaAgregarProducto() throws InterruptedException {
        panelAdminPage.visualizaAgregarProducto();
    }
    @Step
    public void seleccionaLaOpcionAdministrarCaracteristica() throws InterruptedException {
        panelAdminPage.seleccionaLaOpcionAdministrarCaracteristica();
    }
    @Step
    public void visualizaLasCaracteristicas() throws InterruptedException {
        panelAdminPage.visualizaLasCaracteristicas();
    }
}
