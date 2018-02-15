CREATE DATABASE `lottery`;

USE `lottery`;

DROP TABLE IF EXISTS `keno`;

CREATE TABLE `keno` (
  `kenoId` char(16) NOT NULL DEFAULT '' COMMENT '主键',
  `country` varchar(16) NOT NULL COMMENT '开奖国家',
  `drawNo` varchar(8) NOT NULL DEFAULT '' COMMENT '期号',
  `result` varchar(64) NOT NULL COMMENT '开奖结果，多个数字，逗号隔开',
  `total` smallint(6) NOT NULL COMMENT '总和',
  `bigSmall` varchar(5) NOT NULL DEFAULT '' COMMENT '总和大小。开奖结果总和大于 810，则为 BIG；小于 810，则为 SMALL；等于 810，则为 810',
  `oddEven` varchar(4) NOT NULL DEFAULT '' COMMENT '总和奇偶；偶数 - EVEN；奇数 - ODD',
  `oddsEvens` varchar(5) NOT NULL DEFAULT '' COMMENT '奇偶个数的多少；偶数个数多 - EVENS；奇数个数多 - ODDS；奇偶个数一样多 - DRAW',
  `upperLower` varchar(6) NOT NULL DEFAULT '' COMMENT '大数（41-80）小数（1-40）个数的多少；大数多 - UPPER；小数多 - LOWER；大数小数一样多 - MIDDLE',
  `fiveElements` varchar(5) NOT NULL DEFAULT '' COMMENT '五行',
  `drawAt` bigint(13) NOT NULL DEFAULT '0' COMMENT '开奖时间',
  `createAt` bigint(13) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updateAt` bigint(13) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`kenoId`),
  UNIQUE KEY `country_drawNo` (`country`,`drawNo`),
  KEY `total` (`total`),
  KEY `bigSmall` (`bigSmall`),
  KEY `addEven` (`oddEven`),
  KEY `oddsEvens` (`oddsEvens`),
  KEY `upperLower` (`upperLower`),
  KEY `fiveElements` (`fiveElements`),
  KEY `drawAt` (`drawAt`),
  KEY `createAt` (`createAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='快乐 8 / keno';