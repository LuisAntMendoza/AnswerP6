# AnswerP6 ![logoQuest3](https://user-images.githubusercontent.com/65323540/85762696-9b6d2000-b6d9-11ea-861a-aca9fe47e008.png)
## Equipo: Whiter Team :sunglasses:
## Integrantes:
* Gabriel Rivas Maldonado
* Luis Antonio Mendoza Ramirez
* López Esquivel Emiliano
* Umaña Aguirre Cristian Alberto
* Juárez Almaguer José Carlos 
## Guiás de instalación
### Aplicaciones necesarias para el uso sin problemas de la pagina:
* Xampp (Windows) o Mamp (MacOs)
* Git

## Instalación
### Windows
##### Página
1. Una vez instalada la aplicación Xampp acceder al Panel de control, en el cual se deberá activar los servidores de Apache y MySQL, Este paso en muy importante ya que  de no tener activos estos dos no podrá visualizar la página.
2. Clonar el Repositorio en la ruta **C:/(Ruta_Xampp)/htdocs** .Donde se creará una carpeta con todos los archivos necesarios para la visualización correcta de la página.
(Para clonar con exito el repositorio deberá de dirijirse a la parte superior donde va a visualizar un botón verde que dice  :arrow_down: **Clone**, Este deberá estar seleccionado como **Clone with HTTPS** y presionar  :clipboard: el cual es el símbolo de porta papeles)
3. Una vez que se copió el enlace deberá de Abrir su terminal con las teclas de Windows + r, y selecionará su ruta(antes mencionada) una vez en la ruta con ayuda de git se colocará **git clone** y el enlace copiado. Presionará enter, de esta forma todos los archivos que necesita estarán descargados.
##### Base de Datos 
1. Verificar si en el Panel de control de Xampp esta activada el módulo de **MySQL**
2. Crear la Base de Datos:
* Ingresar a la terminal con _*Windows + r*_ e ir a la ruta **C:\Xampp\mysql\bin**
* usuario: **adminAnswerP6** contraseña: **DB4dm1n-P6**
* Una vez que se ingresó al usuario se va a crear la base conlocando:
* **CREATE DATABASE AnswerP6;**
* Ya creada deberá de ingresar con: 
* **USE AnswerP6;**
3. Una vez ya creada la Base de datos se restaurará el respaldo que está en la carpeta **Docs** en la subcarpeta **BD** la cual va a copiar y la pegará en la ruta: _*C:\Xampp\mysql\bin*_ .
4. Ya que el respaldo se encuentra en la carpeta bin  :file_folder:
5. En la Consola(Terminal) de MySQL colocará lo siguiente:
* **SOURCE BD_Answer.P6.sql;**
* Si se realizaron los pasos debidamente ya esta lista la Base de Datos  :clap:

### MacOS
##### Página
1. Una vez instalada la aplicación MAMP, abrirla y dar clic en Start Servers, esto activará los servidores de Apache y MySQL. Este paso es muy importante ya que de no tener activos estos dos no podrá visualizar la página.
2. Clonar el Repositorio en la ruta **C:/(Ruta_MAMP)/htdocs** .Donde se creará una carpeta con todos los archivos necesarios para la visualización correcta de la página.
(Para clonar con éxito el repositorio deberá de dirijirse a la parte superior donde va a visualizar un botón verde que dice  :arrow_down: **Clone**, Este deberá estar seleccionado como **Clone with HTTPS** y presionar  :clipboard: el cual es el símbolo de porta papeles)
3. Una vez que se copió el enlace deberá de Abrir su aplicación de la terminal, y selecionará su ruta(antes mencionada) una vez en la ruta con ayuda de git se colocará **git clone** y el enlace copiado. Presionará enter, de esta forma todos los archivos que necesita estarán descargados.
##### Base de Datos 
1. Verificar si en el Panel de control de MAMP esta activado el módulo de **MySQL Server**
2. Crear la Base de Datos:
* Ingresar a la aplicación de la terminal e ir a la ruta **C:\MAMP\bin\apache2\bin**
* usuario: **adminAnswerP6** contraseña: **DB4dm1n-P6**
* Una vez que se ingresó al usuario se va a crear la base conlocando:
* **CREATE DATABASE AnswerP6 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;**
* Ya creada deberá de ingresar con: 
* **USE AnswerP6;**
3. Una vez ya creada la Base de datos se restaurará el respaldo que está en la carpeta **docs** en la subcarpeta **BD** la cual va a copiar y la pegará en la ruta: _*C:\MAMP\bin\apache2\bin*_ .
4. Ya que el respaldo se encuentra en la carpeta bin  :file_folder:
5. En la Consola(Terminal) de MySQL colocará lo siguiente:
* **SOURCE BD_Answer.P6.sql;**
* Si se realizaron los pasos debidamente ya esta lista la Base de Datos  :clap:

## Ejecución de la página
Con los Archivos descargados,la Base de Datos creada y con **Apache Server** activado, ahora solo tendrá que ir a su navegador de su preferencia y en la sección de URL colocará localhost y presionará la Carpeta AnswerP6 y podrá disfrutar de la experiencia de esta Fantastica página  :sparkles: :sparkles:
