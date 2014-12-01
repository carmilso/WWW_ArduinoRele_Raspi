// rele.ino

#define rele 4

uint8_t valor = 1;

void setup() {
	Serial.begin(9600);
	pinMode(rele, OUTPUT);
	delay(25);
	digitalWrite(rele, valor);
}

void loop() {
	while(Serial.available()>0){
		char dato = Serial.read();
		if(dato=='0' || dato=='1'){
			valor = (dato == '0') ? 0 : 1;
			digitalWrite(rele, dato);
		}
		delay(25);
	}
}
