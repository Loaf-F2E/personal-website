package initialize

import (
	"fmt"
	"personal-website/global"
	"personal-website/initialize/internal"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Gorm() *gorm.DB {
	m := global.CONFIG.Mysql
	dsn := m.Dsn()
	fmt.Println("dsn:", dsn)
	mysqlConfig := mysql.Config{
		// DSN:                       "root:123456@tcp(127.0.0.1:33306)/personal_website?charset=utf8mb4&parseTime=True&loc=Local",
		DSN:                       dsn,
		DefaultStringSize:         191,   // string 类型字段的默认长度
		DisableDatetimePrecision:  true,  // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
		DontSupportRenameIndex:    true,  // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
		DontSupportRenameColumn:   true,  // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
		SkipInitializeWithVersion: false, // 根据版本自动配置
	}
	if db, err := gorm.Open(mysql.New(mysqlConfig), gormConfig()); err != nil {
		return nil
	} else {
		sqlDB, _ := db.DB()
		sqlDB.SetMaxIdleConns(0)
		sqlDB.SetMaxOpenConns(0)
		return db
	}
}

func gormConfig() *gorm.Config {
	config := &gorm.Config{DisableForeignKeyConstraintWhenMigrating: true, SkipDefaultTransaction: true}

	config.Logger = internal.Default.LogMode(logger.Info)

	return config
}
