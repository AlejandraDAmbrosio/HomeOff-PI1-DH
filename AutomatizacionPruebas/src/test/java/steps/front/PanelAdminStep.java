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
}
