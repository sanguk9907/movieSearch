/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.25-MariaDB : Database - moviesearch
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`moviesearch` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `moviesearch`;

/*Table structure for table `lieked` */

DROP TABLE IF EXISTS `lieked`;

CREATE TABLE `lieked` (
  `seq` int(12) NOT NULL AUTO_INCREMENT COMMENT '좋아요 고유번호',
  `movieID` int(20) NOT NULL COMMENT '좋아요 된 영화 아이디',
  `userID` varchar(100) NOT NULL COMMENT '좋아요 한 유저 아이디',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

/*Data for the table `lieked` */

insert  into `lieked`(`seq`,`movieID`,`userID`) values 
(71,616820,'tkddnr6079'),
(72,238,'tkddnr6079'),
(95,436270,'tkddnr6079'),
(96,1003596,'tkddnr6079'),
(97,663712,'tkddnr6079'),
(98,985939,'tkddnr6079'),
(99,49046,'tkddnr6079');

/*Table structure for table `review` */

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `seq` int(12) NOT NULL AUTO_INCREMENT COMMENT '리뷰 고유번호',
  `movieID` int(100) NOT NULL COMMENT '영화 아이디',
  `content` varchar(1000) NOT NULL COMMENT '리뷰 내용',
  `userID` varchar(100) NOT NULL COMMENT '리뷰 단 유저 아이디',
  `nick` varchar(100) NOT NULL COMMENT '유저 닉네임',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

/*Data for the table `review` */

insert  into `review`(`seq`,`movieID`,`content`,`userID`,`nick`) values 
(60,900667,'와 짱!','tkddnr123123','이상욱'),
(61,900667,'ㅇㅇ','tkddnr123123','이상욱');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `seq` int(12) NOT NULL AUTO_INCREMENT COMMENT '유저 고유번호',
  `userID` varchar(100) NOT NULL COMMENT '유저 아이디',
  `password` varchar(100) NOT NULL COMMENT '유저 비밀번호',
  `salt` varchar(100) NOT NULL COMMENT '유저 솔트',
  `nick` varchar(100) NOT NULL COMMENT '유저 닉네임',
  `userIntroduction` varchar(1000) DEFAULT NULL COMMENT '유저 소개',
  `email` varchar(100) NOT NULL COMMENT '유저 이메일',
  `phoneNumber` int(11) NOT NULL COMMENT '유저 전화번호',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`seq`,`userID`,`password`,`salt`,`nick`,`userIntroduction`,`email`,`phoneNumber`) values 
(8,'tkddnr6079','7+2u5duKtfE9m5VyUex/FzBys8sFJbHZm5F4DU07Ps20XtcPp68svAxd7wSRNUyz9waqER8wwO7iVcdHP7mzGg==','Gbl9kFse3vGRN02dDz19b+yoQ+R9FmxiEudEJH2BcMne68RjhQ4JxAdeRUVdC4L2wCTmXVmsiBNv+fUrtTcSsQ==','d','d','',0),
(9,'123123','t+KFo7FbqVIoMF7GvFhDsx0hAd42/z2GV3AgT6NrXQWUXf7axPRnlQprVGzjTS2Fo23GcUPTPDCzyBzt70NVKw==','ssiU+nmUwAgGYShjSIRo2Ty0wjaTE6GDhETaQ9Xpz8y7EtJIXfqqhOaUTLQcDAjy7v8QxgLnqk8Gso7fMnnTAA==','34534','\"\"','',0),
(10,'asdf1234','QJMQjcZ4319FQmaE3InkC+2o/79IfzmOeaZ+HI3OLE3TiDkw2sGE9B9W8RKnPxLWd3VZMWnp20IgrKgvdBGayg==','UfxU5fc9VKrHam5RVZjaqam2hUk/7cF7KyRhXkVUERon2CAALyiS52IFbVzvpv7hjCHyYjWvafmqdYMu0jT7Cw==','asdf123','\"\"','asdf123',1000000000),
(11,'tkdtkd123123','C7WUABwWWfVQMWmM9CVXCXPdJ9qZr7FAOrGpRcCtBCXfEdOmR18iYv+uGIFVK+ZWchKnq5R7SMeG4kFzRdf7ew==','JXHU5b5kA9tpEDVrUm6WrClXy34KSq7SgOI3+CaGg9Llpp14RhFzWnk/ik6CP0HRAJBAovf7988ur+X+VMV+Qg==','dltkddnr','\"\"','asdfasdf@dd',2147483647),
(12,'asdfsadfds123','bX1BxHpL4CRev4CQXYI2QDTicez5lU6GxwwfbuTFUA3ICDT3Dikyu9DIUTxU4GMm1Zl5UvHPDpxeybYNltQ36A==','V6Wbw9KPyLm4BI2j8pS9gPUbU/h1NftuB3MP0r7m9bS3u6ELxGVl+vdlxFh8mO8SXBd38rRUx+xsfwfytb0RHQ==','dfasfsdf','\"\"','safsdf@dd.cc',2147483647),
(13,'sdfaesrgd4343','RQqj/WBnoZMfBH+17VokSB3Xplo4Rz1hPm0qMkGsMDtvug63bcP91FLq2f/R5VE9QcoSyo2RIiLMoCNHooquaw==','svti0gH5IVoDO2WaOr3IgYlqKH+RG5CreDiDn8I3R8WOE/rmd1QrWQeLGYdlzbKTE9zVaAiT478BxF8wpG95yA==','asdfwaefdsf','\"\"','sadfsdf@ss.ff',2147483647),
(14,'tkddnr123123','XKuX1IbPrCsQCAYMQE/fKTbtafd3fZpiNRAHFcbZqQbpzMkRAnA+cH60UbHYdU49o9UAq1Vi0k/3TwaGE8sc/Q==','j7DAxGZN4Hc6/03SXY5X6EqN62i3+ax2xaePUTfFYC/j09dkWz3+Q6634K3kPT3C7HOliWQnxTAeETsUuCkCeA==','이상욱','ㅇㅇ','tkddnr6079@naver.com',1095909907);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
