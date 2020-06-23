-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: AnswerP6
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_Categoria` int(2) NOT NULL,
  `Categoria` varchar(30) NOT NULL,
  PRIMARY KEY (`id_Categoria`),
  UNIQUE KEY `Categoria` (`Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encuesta` (
  `id_Encuesta` int(6) NOT NULL,
  `Titulo` varchar(30) NOT NULL,
  `Descripcion` varchar(250) NOT NULL,
  `id_Categoria` int(2) DEFAULT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFinal` date NOT NULL,
  `id_Pregunta1` int(6) NOT NULL,
  `id_Pregunta2` int(6) DEFAULT NULL,
  `id_Pregunta3` int(6) DEFAULT NULL,
  `id_Pregunta4` int(6) DEFAULT NULL,
  `id_Pregunta5` int(6) DEFAULT NULL,
  PRIMARY KEY (`id_Encuesta`),
  KEY `id_Categoria` (`id_Categoria`),
  KEY `id_Pregunta1` (`id_Pregunta1`),
  KEY `id_Pregunta2` (`id_Pregunta2`),
  KEY `id_Pregunta3` (`id_Pregunta3`),
  KEY `id_Pregunta4` (`id_Pregunta4`),
  KEY `id_Pregunta5` (`id_Pregunta5`),
  CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`id_Categoria`) REFERENCES `categoria` (`id_Categoria`),
  CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`id_Pregunta1`) REFERENCES `pregunta` (`id_pregunta`),
  CONSTRAINT `encuesta_ibfk_3` FOREIGN KEY (`id_Pregunta2`) REFERENCES `pregunta` (`id_pregunta`),
  CONSTRAINT `encuesta_ibfk_4` FOREIGN KEY (`id_Pregunta3`) REFERENCES `pregunta` (`id_pregunta`),
  CONSTRAINT `encuesta_ibfk_5` FOREIGN KEY (`id_Pregunta4`) REFERENCES `pregunta` (`id_pregunta`),
  CONSTRAINT `encuesta_ibfk_6` FOREIGN KEY (`id_Pregunta5`) REFERENCES `pregunta` (`id_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuesta`
--

LOCK TABLES `encuesta` WRITE;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo` (
  `id_Grupo` int(2) NOT NULL,
  `Grupo` int(3) NOT NULL,
  PRIMARY KEY (`id_Grupo`),
  UNIQUE KEY `Grupo` (`Grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `id_pregunta` int(6) NOT NULL,
  `Pregunta` varchar(50) NOT NULL,
  `ImgApoyo` longblob DEFAULT NULL,
  `id_Respuesta1` int(6) NOT NULL,
  `id_Respuesta2` int(6) NOT NULL,
  `id_Respuesta3` int(6) DEFAULT NULL,
  `id_Respuesta4` int(6) DEFAULT NULL,
  `id_Respuesta5` int(6) DEFAULT NULL,
  `id_Respuesta6` int(6) DEFAULT NULL,
  `id_Respuesta7` int(6) DEFAULT NULL,
  `id_Respuesta8` int(6) DEFAULT NULL,
  `id_Respuesta9` int(6) DEFAULT NULL,
  `id_Respuesta10` int(6) DEFAULT NULL,
  PRIMARY KEY (`id_pregunta`),
  UNIQUE KEY `id_Respuesta1` (`id_Respuesta1`),
  UNIQUE KEY `id_Respuesta2` (`id_Respuesta2`),
  UNIQUE KEY `id_Respuesta3` (`id_Respuesta3`),
  UNIQUE KEY `id_Respuesta4` (`id_Respuesta4`),
  UNIQUE KEY `id_Respuesta5` (`id_Respuesta5`),
  UNIQUE KEY `id_Respuesta6` (`id_Respuesta6`),
  UNIQUE KEY `id_Respuesta7` (`id_Respuesta7`),
  UNIQUE KEY `id_Respuesta8` (`id_Respuesta8`),
  UNIQUE KEY `id_Respuesta9` (`id_Respuesta9`),
  UNIQUE KEY `id_Respuesta10` (`id_Respuesta10`),
  CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_Respuesta1`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_10` FOREIGN KEY (`id_Respuesta10`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_2` FOREIGN KEY (`id_Respuesta2`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_3` FOREIGN KEY (`id_Respuesta3`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_4` FOREIGN KEY (`id_Respuesta4`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_5` FOREIGN KEY (`id_Respuesta5`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_6` FOREIGN KEY (`id_Respuesta6`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_7` FOREIGN KEY (`id_Respuesta7`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_8` FOREIGN KEY (`id_Respuesta8`) REFERENCES `respuesta` (`id_Respuesta`),
  CONSTRAINT `pregunta_ibfk_9` FOREIGN KEY (`id_Respuesta9`) REFERENCES `respuesta` (`id_Respuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respuesta` (
  `id_Respuesta` int(6) NOT NULL,
  `Respuesta` varchar(50) NOT NULL,
  `ImgApoyoRes` longblob DEFAULT NULL,
  PRIMARY KEY (`id_Respuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` int(6) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `ApellidoPat` varchar(15) NOT NULL,
  `ApellidoMat` varchar(15) NOT NULL,
  `FNacimiento` date NOT NULL,
  `FotoPerfil` longblob NOT NULL,
  `NCuenta` int(9) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `CorreoElectronico` varchar(30) NOT NULL,
  `Contraseña` tinytext NOT NULL,
  `id_Grupo` int(2) DEFAULT NULL,
  `NTrabajador` int(6) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `NCuenta` (`NCuenta`),
  UNIQUE KEY `RFC` (`RFC`),
  UNIQUE KEY `CorreoElectronico` (`CorreoElectronico`),
  KEY `id_Grupo` (`id_Grupo`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_Grupo`) REFERENCES `grupo` (`id_Grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-22 19:24:47
