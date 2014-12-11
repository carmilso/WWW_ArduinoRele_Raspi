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


public class MainActivity extends ActionBarActivity {

    private Button button_encendre;
    private Button button_apagar;

    protected HttpURLConnection urlEncendre;
    protected HttpURLConnection urlApagar;


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

    class encen extends AsyncTask<Void, Void, Void> {
        private Void[] voids;

        protected Void doInBackground(Void... voids) {
            this.voids = voids;
            try {
                URL url = new URL("http://62.117.232.31/?opcio=0");
                //URL url = new URL("http://www.android.com");
                urlEncendre = (HttpURLConnection) url.openConnection();


                BufferedInputStream in = new BufferedInputStream(urlEncendre.getInputStream());


                //urlEncendre.getResponseCode();
            } catch (Exception e) {
                System.out.println(e.toString());
            } finally {
                urlEncendre.disconnect();
            }
            return null;
        }
    }

    class apaga extends AsyncTask<Void, Void, Void> {
        private Void[] voids;

        protected Void doInBackground(Void... voids) {
            this.voids = voids;
            try {
                URL url = new URL("http://62.117.232.31/?opcio=1");
                urlApagar = (HttpURLConnection) url.openConnection();

                BufferedInputStream in = new BufferedInputStream(urlApagar.getInputStream());

            } catch (Exception e) {
                System.out.println(e.toString());
            } finally {
                urlEncendre.disconnect();
            }
            return null;
        }
    }

}
