from flask import Flask, render_template, jsonify, after_this_request
import sqlalchemy
import sqlite3
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy
import pandas as pd


app = Flask(__name__)

# SQLAlchemy Setup
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS, False']
# DATABASE_URI = "postgres://postgres:YOURPASSWORD@localhost:5432/Tornadoes_USA"

# db = create_engine(DATABASE_URI)

# results = db.execute("SELECT * FROM tornadoes")

# conn = sqlite3.connect('magnets.sqlite')
# c = conn.cursor()
# results = c.execute("SELECT * FROM tornadoes")

@app.route("/")
def api_call():

    return render_template('index.html')

@app.route("/data")
def data_endpoint():

    conn = sqlite3.connect('magnets.sqlite')
    c = conn.cursor()
    results = c.execute("SELECT * FROM tornadoes")

    tornado_data = []
    for result in results:
        tornado_dict = {}
        tornado_dict["Tornado_ID"] = result[0]
        tornado_dict["Year"] = result[1]
        tornado_dict["Month"] = result[2]
        tornado_dict["Day"] = result[3]
        tornado_dict["Date"] = result[4]
        tornado_dict["State"] = result[5]
        tornado_dict["Magnitude"] = result[6]
        tornado_dict["Injuries"] = result[7]
        tornado_dict["Fatalities"] = result[8]
        tornado_dict["Est_Property_Loss"] = result[9]
        tornado_dict["Start_Lat"] = result[10]
        tornado_dict["Start_Lon"] = result[11]
        tornado_dict["End_Lat"] = result[12]
        tornado_dict["End_Lon"] = result[13]
        tornado_dict["Length_Miles"] = result[14]
        tornado_dict["Width_Yards"] = result[15]
        tornado_data.append(tornado_dict)
    return jsonify(tornado_data)

@app.route("/mobile_homes")
def mobile_homes_endpoint():

    conn = sqlite3.connect('magnets.sqlite')
    c = conn.cursor()
    results = c.execute("SELECT * FROM mobile_homes")

    mh_data = []
    for result in results:
        mh_dict = {}
        mh_dict["OBJECTID"] = result[0]
        mh_dict["LATITUDE"] = result[9]
        mh_dict["LONGITUDE"] = result[10]
        mh_data.append(mh_dict)
    return jsonify(mh_data)

@app.route("/tornadoByState")
def tornadoByState():

    return render_template('tornadoByState.html')
    
@app.route("/tornadoChart")
def tornadoChart():

    return render_template('tornadoChart.html')

@app.route("/alltornadoes")
def alltornadoes():

    return render_template('alltornadoes.html')


if __name__ == "__main__":
    app.run(debug=True)