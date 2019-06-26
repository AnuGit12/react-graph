#!/usr/bin/env python

import os
from flask import Flask, render_template
from flask import request
from flask_cors import CORS
import ast
import json
# import csv 
import glob
from werkzeug.utils import secure_filename
from flask import send_from_directory
from flask import send_file
app = Flask(__name__)
UPLOAD_FOLDER = 'saved_state'
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

import sys

print('This is error output', file=sys.stderr)
print('This is standard output', file=sys.stdout)





@app.route("/")
def index():
    return render_template('index.html')


@app.route("/table-data-save", methods = ['POST'])
def saveTableData():
    table_data = request.files
    
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)

    file = request.files['file'] 
    filename = secure_filename(file.filename)

    destination="/".join([target, filename])
    file.save(destination)

    return "Hello World!"

@app.route("/save-slider", methods = ['GET', 'POST'])
def saveSliderData():
    print("request data", request)
    return "Hello World!"



@app.route("/get-data", methods = ['GET'])
def getData():
    data = os.listdir(UPLOAD_FOLDER)
    saved_state=[]
    for item in os.listdir(UPLOAD_FOLDER):
        if not item.startswith('.'):
            print (type(item))
            saved_state.append(item)
    final_data = json.dumps(saved_state)
    return final_data


@app.route("/open-clicked-state", methods = ['GET'])
def openClickedState():
    state_data={}
    data = request.data
    data1 = request.args.get('id')
    # dataDict = json.loads(data)
    target=os.path.join(UPLOAD_FOLDER,data1)
    data = os.listdir(target)
    data=[]
    for item in os.listdir(target):
        if not item.startswith('.'):
            print (type(item))
            data.append(item)
    print("data",data)
    filename = target+"/"+data[1]
    filepath = target+"/"+data[0]
    print("filename", filepath)
    f = open(filename, "r")
    text_file_data = f.read()
    print (type(text_file_data))
    print(text_file_data)
    d = json.loads(text_file_data)

    input_d= d['input']
    output= d['output']
    constraint = d['constraint']
    dropdown1 = d['dropdown1']
    dropdown2 = d['dropdown2']
    slidersData = json.loads(d['slidersData'])


    state_data['filename']=filepath
    state_data['input_d']=input_d
    state_data['output']=output
    state_data['constraint']=constraint
    state_data['dropdown1']=dropdown1
    state_data['dropdown2']=dropdown2
    state_data['slidersData']=slidersData
    state_data['csv']=send_file(filepath, attachment_filename='small.csv', as_attachment=True)
    print(" ---------------")
    print(type(state_data))
    # final_data = json.dumps(state_data)

    return str(state_data)

    # try:
    #     print("response sent")
    #     return send_file(filepath, attachment_filename='big.csv', as_attachment=True)
    # except Exception as e:
    #     print ("error in response")
    #     return str(e)
@app.route("/save-other-data", methods = ['GET', 'POST'])
def saveOtherData():
    
    # print("file name is", file)
    state_name = request.form['state_name']
    input_data = request.form['input']
    output_data = request.form['output']
    const_data = request.form['constraint']
    dropdown1 = request.form['dropdown1']
    dropdown2 = request.form['dropdown2']
    slidersData = request.form['slidersData']
    data = {}
    data['state_name']=state_name
    data['input']=input_data
    data['output'] = output_data
    data['constraint']=const_data
    data['dropdown1']=dropdown1
    data['dropdown2']=dropdown2
    data['slidersData'] = slidersData

    
    target=os.path.join(UPLOAD_FOLDER,state_name)
    if not os.path.isdir(target):
        os.mkdir(target)

    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    destinationJson = "/".join([target, state_name+".txt"])
    file.save(destination)

    with open(destinationJson, 'w') as f:
        json.dump(data, f, ensure_ascii=False)

    return "Hello World!"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)



#open postgresql terminal
#psql postgres


#create database
#create database mogadb;

# list all the databses
# \l


#create user
#create user moga_user with encrypted password 'password';


#grant permission on databse to user
#grant all privileges on database mogadb to moga_user;