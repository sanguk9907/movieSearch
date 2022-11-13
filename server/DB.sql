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

/*Table structure for table `image` */

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `user_seq` int(12) NOT NULL,
  `fieldname` varchar(100) DEFAULT NULL,
  `originalname` varchar(100) DEFAULT NULL,
  `encoding` varchar(100) DEFAULT NULL,
  `mimetype` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  KEY `seq` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

/*Data for the table `image` */

insert  into `image`(`seq`,`user_seq`,`fieldname`,`originalname`,`encoding`,`mimetype`,`destination`,`filename`,`path`,`size`) values 
(50,27,'file','KakaoTalk_20210819_190258571_02.jpg','7bit','image/jpeg','../client/public/img','file_1668344489157.jpg','..clientpublicimgfile_1668344489157.jpg','3210846');

/*Table structure for table `likes` */

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `seq` int(12) NOT NULL AUTO_INCREMENT COMMENT '좋아요 고유번호',
  `movieID` int(20) NOT NULL COMMENT '좋아요 된 영화 아이디',
  `user_seq` int(12) NOT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

/*Data for the table `likes` */

insert  into `likes`(`seq`,`movieID`,`user_seq`) values 
(71,616820,0),
(72,238,0),
(95,436270,0),
(96,1003596,0),
(97,663712,0),
(98,985939,0),
(99,49046,0),
(101,663712,0),
(110,49046,0),
(111,49046,0),
(112,851644,0),
(113,49046,0),
(120,49046,0),
(122,900667,0),
(128,663712,0),
(133,436270,0),
(134,505642,0),
(136,436270,27),
(138,675054,27),
(139,663712,27),
(140,505642,27),
(141,49046,27);

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
  `userIntroduction` varchar(1000) NOT NULL DEFAULT '나를 소개해주세요!' COMMENT '유저 소개',
  `email` varchar(100) NOT NULL COMMENT '유저 이메일',
  `phoneNumber` int(11) NOT NULL COMMENT '유저 전화번호',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`seq`,`userID`,`password`,`salt`,`nick`,`userIntroduction`,`email`,`phoneNumber`) values 
(27,'tkddnr123','HnVRW9fKTXrPtnNsm57rQXmADito9rpBNHtL33nm8SESPtn/aQQBxSjZDXhK4Prs00Lpb1gjGGlXQGEFOSMepw==','wq7nV9eGzl9kWTo6S0qwzAwCgby/S310U2DkIR7spjZhyZoU4msBhE9mJ5Zkd7Jzf1toHjptu0Soqp3U8ieGIw==','이상욱','undefined','sfsd@aa.aa',123),
(28,'tkddnr11','vhP4xsmAEx+unsj4LxrYf7rRybj6L4WECajDN4gF1DR5cX+57l2lAnJjk0SZWT2PYOyhMcjobVznM/kYDActTw==','qkby+VwnqIkmxCY4jYoTN15mkOeDxLy5Pnlix0WwxynEQWRmXZMB7v6PjxaKYD77x2AV5dZyG4z/jmcOnNXcag==','11','','aa@aa.aa',11),
(29,'tkddnr11','4SbN0xW++ukqVR3XAE7AAwji50zcjhVv7Q+VU66K3XrCqy5k4mmxoyuFHlDAdgcQzvdevfnWUzkhhv07FKIM7A==','JsFpeMTla5ktQQoNCdPCdp0bGDzMW82KMXxWLDmFB3I7G7GMk+RsTQzBBia6cz86YJsiG8N16BoX57RSCJKQlA==','11','','aa@aa.aa',11);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
