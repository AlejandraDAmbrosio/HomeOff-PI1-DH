package stepdefinitions.front.iniciasesion;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.thucydides.core.annotations.Steps;
import steps.front.InicioSesionStep;

public class IniciarSesionStepDefinition {

    @Steps
    InicioSesionStep inicioSesionStep;

    @Given("Que se tiene un usuario existente")
    public void que_se_tiene_un_usuario_existente() throws InterruptedException {
        inicioSesionStep.ingresoOpcionInicioSesion();

    }
    @When("Se ingrese en el login y se ingresen los datos del correo {string} y contrasena {string}")
    public void se_ingrese_en_el_login_y_se_ingresen_los_datos_del_correo_y_contrasena(String string, String string2) throws InterruptedException {
        inicioSesionStep.ingresoUsuarioYContrasena(string,string2);

    }
    @Then("al dar clic en Acceso, debe permitir ingresar correctamente")
    public void al_dar_clic_en_acceso_debe_permitir_ingresar_correctamente() throws InterruptedException {
        inicioSesionStep.validacionAccesoAdmin();
    }
}
