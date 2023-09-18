package stepdefinitions.front.creacuenta;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.thucydides.core.annotations.Steps;
import steps.front.CreaCuentaStep;

public class CreaCuentaStepDefinition {
    @Steps
    CreaCuentaStep creaCuentaStep;

    @Given("Que se quiere crear un usuario para navegar")
    public void que_se_quiere_crear_un_usuario_para_navegar() throws InterruptedException {
        creaCuentaStep.ingresoOpcionCrearUsuario();
       // creaCuentaStep.abrirAdmonUser();
    }
    @When("se ingrese la informacion de los datos requeridos para creacion de cuenta")
    public void se_ingrese_la_informacion_de_los_datos_requeridos_para_creacion_de_cuenta() throws InterruptedException {
        creaCuentaStep.validacionCreaCuenta();
    }
    @Then("Se debe generar un mensaje indicando que la cuenta se creo correctamente")
    public void se_debe_generar_un_mensaje_indicando_que_la_cuenta_se_creo_correctamente() throws InterruptedException {
        creaCuentaStep.confirmacionCreaCuenta();
    }
    @And("al consultar en la administracion de usuario se debe visualizar la informacion del usuario creado")
    public void al_consultar_en_la_administracion_de_usuario_se_debe_visualizar_la_informacion_del_usuario_creado() throws InterruptedException {
        creaCuentaStep.verificacionCreaUsuario();
    }
}
