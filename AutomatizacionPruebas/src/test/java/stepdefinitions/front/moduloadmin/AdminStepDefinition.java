package stepdefinitions.front.moduloadmin;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Steps;
import steps.front.PanelAdminStep;

public class AdminStepDefinition extends PageObject {
    @Steps
    PanelAdminStep panelAdminStep;
    @Given("Que el admin ya se encuentra autenticad")
    public void que_el_admin_ya_se_encuentra_autenticad() throws InterruptedException {
        panelAdminStep.validacionAutenticadoAdmin();
    }
    @When("Selecciona la opcion panel admin")
    public void selecciona_la_opcion_panel_admin() throws InterruptedException {
        panelAdminStep.seleccionOpcionAdmin();
    }
    @Then("visualiza las opciones del administrador")
    public void visualiza_las_opciones_del_administrador() throws InterruptedException {
        panelAdminStep.validacionOpcionesAdmin();
    }

    //TC05
    @Given("Que el admin ya se encuentra en panael admin")
    public void que_el_admin_ya_se_encuentra_en_panel_admin() throws InterruptedException {
        panelAdminStep.ValidacionAdmin();
        System.out.println("***Desarrollo***");
    }
    @When("Selecciona la opcion listar producto")
    public void selecciona_la_opcion_listar_producto() throws InterruptedException {
        panelAdminStep.seleccionarOpcionListaProductos();
        System.out.println("***Desarrollo***");
    }
    @Then("visualiza los productos")
    public void visualiza_los_productos() throws InterruptedException {
        panelAdminStep.visualizaLosProductos();
        System.out.println("***Desarrollo***");
    }
    //TC06

    @When("Selecciona la opcion agregar producto")
    public void selecciona_la_opcion_agregar_producto() throws InterruptedException {
        panelAdminStep.seleccionarOpcionAgregarProductos();
        System.out.println("***Desarrollo***");
    }
    @Then("visualiza agregar producto")
    public void visualiza_agregar_producto() throws InterruptedException {
        panelAdminStep.visualizaAgregarProducto();
        System.out.println("***Desarrollo***");
    }

    //TC07

    @When("Selecciona la opcion administrar caracteristica")
    public void selecciona_la_opcion_administrar_caracteristica() throws InterruptedException {
        panelAdminStep.seleccionaLaOpcionAdministrarCaracteristica();
        System.out.println("***Desarrollo***");
    }
    @Then("visualiza las caracteristicas")
    public void visualiza_las_caracteristicas() throws InterruptedException {
        panelAdminStep.visualizaLasCaracteristicas();
        System.out.println("***Desarrollo***");
    }

}
