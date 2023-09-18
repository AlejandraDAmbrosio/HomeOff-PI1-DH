package pagesobject.front.creacuenta;

import net.serenitybdd.core.pages.PageObject;
import org.junit.Assert;
import starter.executetest.BaseWrapper;

import java.util.Objects;

public class CreaCuentaPage extends PageObject {

    String btoCreaCuenta = "return document.querySelector(\"#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1qsxih2 > div > h4\")";
    String campoNombre = "return document.querySelector(\"#nombre\")";
    String campoApellido = "return document.querySelector(\"#apellido\")";
    String campoEmail = "return document.querySelector(\"#email\")";
    String campoConfirmacion = "return document.querySelector(\"#confirmaremail\")";
    String campoPassword = "return document.querySelector(\"#password\")";
    String campoConfirPassword = "return document.querySelector(\"#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1qsxih2 > div > form > div > div:nth-child(6) > div > input\")";
    String btoFinalizaCreacion = "return  document.querySelector(\"#root > div.pagina-formulario-alta > form > div > button\")";
    String mensajeCreacion = "return document.querySelector(\"#root > div.pagina-formulario-alta > form > h5\")";
    String nombreIngresado = "Katha Maria";

    BaseWrapper baseWrapper = new BaseWrapper();

    public void validacionCreaCuenta() throws InterruptedException {
        String actual = baseWrapper.FactoryShadowRootGetText(btoCreaCuenta);
        String esperado = "Crea tu cuenta";
        Assert.assertEquals(esperado,actual);
        baseWrapper.ScrollDownPage();
        Thread.sleep(2000);
        baseWrapper.ScrollUpPage();
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootSendKeys(campoNombre,nombreIngresado);
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootSendKeys(campoApellido,"Aldana");
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootSendKeys(campoEmail,"kaldana16@gmail.com");
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootSendKeys(campoConfirmacion,"kaldana16@gmail.com");
        Thread.sleep(2000);
        baseWrapper.Scroll(300);
        baseWrapper.FactoryShadowRootSendKeys(campoPassword,"Pedirs12*");
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootSendKeys(campoConfirPassword,"Pedirs12*");
        Thread.sleep(2000);
        baseWrapper.ScrollDownPage();
        Thread.sleep(2000);

    }

    public void confirmacionCreaCuenta() throws InterruptedException {
        Thread.sleep(1000);
        String llave1 = "Si ejecutar";
        String llave2 = "NO ejecutar";

        if (llave2.equals(llave1)){
            baseWrapper.ClickShadowRootObject(btoFinalizaCreacion);
            Thread.sleep(4000);
            String resultadoCreacionActual = baseWrapper.FactoryShadowRootGetText(mensajeCreacion);
            String resultadoCreacionesperado = "Gracias !! Te has registrado como usuario de HomeOFF!!";
            Assert.assertEquals(resultadoCreacionesperado,resultadoCreacionActual);
        }
    }

    public void verificacionCreaUsuario() throws InterruptedException {
        Thread.sleep(1000);
        String llave3 = "Si ejecutar";
        String llave4 = "NO ejecutar";

        if (llave3.equals(llave4)){
            int i;
            for (i=1;i<=30;i++){
                String rutaBase = "return document.querySelector(\"#root > div.administracion-users > div.paneles > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-1fw5qro-MuiPaper-root > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3) > div\")";

                String comparar = baseWrapper.FactoryShadowRootGetText(rutaBase);
                if (Objects.equals(comparar, nombreIngresado)){
                    System.out.println("Usuario creado en la posición " + i + " y creado con exito");
                    break;
                }
            }
        }
    }
}
//cada vez que se cree un usuario cuando este el botón de eliminación inlcuirle esto



