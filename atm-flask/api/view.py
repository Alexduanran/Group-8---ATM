from flask import Blueprint, jsonify, request
from .Data_Arrangement import stock_data
from . import db
from .models import Input

main = Blueprint('main', __name__)

@main.route('/edit_inputs', methods=['POST'])
def edit_inputs():
    input_data = request.get_json()

    temp = Input.query.one_or_none()

    if temp == None:
        print("Adding new input")
        new_input = Input(company=input_data['company'],
                          rep=input_data['rep'],
                          input_layer=input_data['input_layer'],
                          start_date = input_data['start_date'],
                          train_iteration = input_data['train_iteration'],
                          drunkness_index = input_data['drunkness_index'],
                          num_of_starting_points = input_data['num_of_starting_points'],
                          hidden_layer_one = input_data['hidden_layer_one'],
                          hidden_layer_two = input_data['hidden_layer_two'],
                          hidden_layer_three = input_data['hidden_layer_three'])
        db.session.add(new_input)
        db.session.commit()
    else:
        print("Editing new input")
        temp.company = input_data['company']
        temp.rep = input_data['rep']
        temp.input_layer = input_data['input_layer']
        temp.start_date = input_data['start_date']
        temp.train_iteration = input_data['train_iteration']
        temp.drunkness_index = input_data['drunkness_index']
        temp.num_of_starting_points = input_data['num_of_starting_points']
        temp.hidden_layer_one = input_data['hidden_layer_one']
        temp.hidden_layer_two = input_data['hidden_layer_two']
        temp.hidden_layer_three = input_data['hidden_layer_three']
        db.session.commit()

    return 'Done', 201

@main.route('/datas')
def datas():
    temp = Input.query.first()
    if temp.hidden_layer_two == 0 and temp.hidden_layer_three == 0:
        data = stock_data(100,temp.company,temp.rep,temp.input_layer,temp.start_date,temp.train_iteration,temp.drunkness_index,temp.num_of_starting_points,[temp.input_layer,temp.hidden_layer_one,1])
    elif temp.hidden_layer_three == 0:
        data = stock_data(100,temp.company,temp.rep,temp.input_layer,temp.start_date,temp.train_iteration,temp.drunkness_index,temp.num_of_starting_points,[temp.input_layer,temp.hidden_layer_one,temp.hidden_layer_two,1])
    else:
        data = stock_data(100,temp.company,temp.rep,temp.input_layer,temp.start_date,temp.train_iteration,temp.drunkness_index,temp.num_of_starting_points,[temp.input_layer,temp.hidden_layer_one,temp.hidden_layer_two,temp.hidden_layer_three,1])
    predicted_arr = data[0].tolist()
    original_arr = data[1].tolist()

    return jsonify({'predicted_arr' : predicted_arr, 'original_arr' : original_arr})