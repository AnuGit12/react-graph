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


app = Flask(__name__)
UPLOAD_FOLDER = 'saved_state'
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER







@app.route("/")
def index():
    return render_template('index.html')


@app.route("/table-data-save", methods = ['POST'])
def saveTableData():
    table_data = request.files
    # print("is file", request.files)
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
    # print(">?>?>?>?>?>?>?>?>?>?>?>?>",os.listdir(glob.glob(os.path.join(UPLOAD_FOLDER, '*'))))
    data = os.listdir(UPLOAD_FOLDER)
    saved_state=[]
    for item in os.listdir(UPLOAD_FOLDER):
        if not item.startswith('.'):
            print (type(item))
            saved_state.append(item)
    print("final saved state============", saved_state)
    final_data = json.dumps(saved_state)
    return final_data


@app.route("/open-clicked-state", methods = ['GET'])
def openClickedState():
    state_data={}
    data = request.data
    data1 = request.args.get('id')
    # dataDict = json.loads(data)
    target=os.path.join(UPLOAD_FOLDER,data1)

    print("request data",target)

    data = os.listdir(target)
    print ("data>>>>>>>",data)
    # final_data = json.dumps(data)
    filename = target+"/"+data[1]
    filepath = target+"/"+data[0]
    print("filename", "/"+filename)
    print("text file name",filepath)

    # os.chdir( target )
    # result = glob.glob( '*/**.csv' )
    # print( "---------------",result )

    f = open(filename, "r")
    text_file_data = f.read()
    print(":::::::::",text_file_data)
    d = json.loads(text_file_data)

    print("type of data", type(d))
    print("data_____", d['state_name'])
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
    print("???",state_data)
    final_data = json.dumps(state_data)

    return final_data



@app.route("/save-other-data", methods = ['GET', 'POST'])
def saveOtherData():
    
    # print("file name is", file)
    state_name = request.form['state_name']
    print(">>>>>>>>>>>>.",state_name)
    input_data = request.form['input']
    print(">>>>>>>>>>>>>>>>>>............",input_data)
    output_data = request.form['output']
    print(">>>>>>>>>>>>>>>>>>>>>>>>.................",output_data)
    const_data = request.form['constraint']
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>............................",const_data)

    dropdown1 = request.form['dropdown1']
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>............................",dropdown1)
    dropdown2 = request.form['dropdown2']
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..................................",dropdown2)

    slidersData = request.form['slidersData']


    # print(">>>>>>>>>>>>>>>>>>..",dropdown)
    data = {}
    data['state_name']=state_name
    data['input']=input_data
    data['output'] = output_data
    data['constraint']=const_data
    data['dropdown1']=dropdown1
    data['dropdown2']=dropdown2
    data['slidersData'] = slidersData

    print(">>>>>>))))))))))))))))(((((((((((((((((")
    
    target=os.path.join(UPLOAD_FOLDER,state_name)
    print(">>>>>>",target)
    if not os.path.isdir(target):
        print('creating path++++++++++')
        os.mkdir(target)

    file = request.files['file'] 
    print('1')
    filename = secure_filename(file.filename)
    print('2')

    destination="/".join([target, filename])
    print('3')

    destinationJson = "/".join([target, state_name+".txt"])
    print('4',destinationJson)

    print("destination", destination)
    file.save(destination)
    print('5')

    with open(destinationJson, 'w') as f:
        json.dump(data, f, ensure_ascii=False)

    

    # print("is file 3", request.files)
    # state_name = ast.literal_eval(data)
    # dic = json.loads(data)
    # print("dic", dic)
    # print(">",dic.h)
    # print("data>>>>>>.",type(data))
    # print("data>>>>>>.>>>>>>>>>>>>>>>>>>>>.",data)
    # print("data>>>>>>.",data)



    # state_name = data['state_name']
    # input_data = dic['input']
    # output_data = dic['output']
    # const_data = dic['constraint']
    # dropdown_1 = dic['dropdown']['selectedDropdown']['1']
    # dropdown_2 = dic['dropdown']['selectedDropdown']['2']
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