package config

type Mysql struct {
	User     string `mapstructure:"user" json:"user" yaml:"user"`
	Host     string `mapstructure:"host" json:"host" yaml:"host"`
	Part     string `mapstructure:"part" json:"part" yaml:"part"`
	Dbname   string `mapstructure:"dbname" json:"dbname" yaml:"dbname"`
	Password string `mapstructure:"password" json:"password" yaml:"password"`
	Config   string `mapstructure:"config" json:"config" yaml:"config"` // 高级配置
}

func (m *Mysql) Dsn() string {
	return m.User + ":" + m.Password + "@tcp(" + m.Host + ":" + m.Part + ")/" + m.Dbname + "?" + m.Config
}
