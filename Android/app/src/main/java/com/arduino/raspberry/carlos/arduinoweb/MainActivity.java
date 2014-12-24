package com.arduino.raspberry.carlos.arduinoweb;

import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import android.app.AlertDialog;
import android.app.Dialog;


public class MainActivity extends ActionBarActivity {

    private Button button_encendre;
    private Button button_apagar;

    protected HttpURLConnection URL;

    public static TextView estat;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button_encendre = (Button) findViewById(R.id.button_on);
        button_encendre.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                encendre(null);
            }
        });

        button_apagar = (Button) findViewById(R.id.button_off);
        button_apagar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                apagar(null);
            }
        });

        estat = (TextView) findViewById(R.id.estat_textView);
    }

    public static void setText(String text) {
        estat.setText(text);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void encendre(View view) {
        new encen().execute();
    }

    public void apagar(View view) {
        new apaga().execute();
    }

    class encen extends AsyncTask<String, Float, Integer> {
        private int exc = 0;
        BufferedInputStream in;
        String tornada = "";
        int code;

        protected Integer doInBackground(String... noUsat) {
            try {
                URL url = new URL("http://62.117.232.31/?opcio=0");
                URL = (HttpURLConnection) url.openConnection();

                URL.setConnectTimeout(3000);

                code = URL.getResponseCode();
                System.out.println(code);
                in = new BufferedInputStream(URL.getInputStream());

                byte[] contents = new byte[1024];
                int bytesRead=0;

                while ((bytesRead = in.read(contents)) != -1) {
                    tornada += new String(contents, 0, bytesRead);
                }

                System.out.println("Resultat -> " + tornada);

            } catch (Exception e) {
                exc = 1;
                System.out.println("-----------> " + e.getMessage());
            } finally {
                URL.disconnect();
            }
            return 0;
        }

        protected void onPostExecute(Integer valor){
            String aux = "";

            if(code == 500)
                estat.setText("Error al connectar amb l'Arduino");

            else if(exc == 0) {
                aux = (tornada.matches("(.*)encesa(.*)")) ? "Encesa" : "Apagada";
                estat.setText(aux);
            }

            else
                estat.setText("El servidor no respon");
        }
    }

    class apaga extends AsyncTask<String, Float, Integer> {
        private int exc = 0;
        BufferedInputStream in;
        String tornada = "";
        int code;

        protected Integer doInBackground(String... noUsat) {
            try {
                URL url = new URL("http://62.117.232.31/?opcio=1");
                URL = (HttpURLConnection) url.openConnection();

                URL.setConnectTimeout(3000);

                code = URL.getResponseCode();
                System.out.println(code);
                in = new BufferedInputStream(URL.getInputStream());

                byte[] contents = new byte[1024];
                int bytesRead=0;

                while ((bytesRead = in.read(contents)) != -1) {
                    tornada += new String(contents, 0, bytesRead);
                }

            } catch (Exception e) {
                exc = 1;
                System.out.println("-----------> " + e.getMessage());
            } finally {
                URL.disconnect();
            }
            return 0;
        }

        protected void onPostExecute(Integer valor){
            String aux = "";

            if(code == 500)
                estat.setText("Error al connectar amb l'Arduino");

            else if(exc == 0) {
                aux = (tornada.matches("(.*)encesa(.*)")) ? "Encesa" : "Apagada";
                estat.setText(aux);
            }

            else
                estat.setText("El servidor no respon");
        }
    }

}
