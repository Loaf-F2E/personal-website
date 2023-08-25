package core

import (
	"fmt"

	"github.com/spf13/viper"
)

func Viper(path ...string) *viper.Viper {
	var config string = "config.yaml"
	v := viper.New()
	v.SetConfigFile(config)
	v.SetConfigType("yaml")

	err := v.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	v.WatchConfig()
	// v.OnConfigChange(e fsnotify.Event) [
	// 	fmt.Println("config file changed:", e.Name)
	// 	if err := v.Unmarshal()
	// ]

	return v
}
