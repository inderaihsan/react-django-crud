from django.shortcuts import render
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from dataprep.eda import create_report
import pandas as pd
import numpy as np
import tempfile
import webbrowser
import os 
# Create your views here.


def calculation (data) : 
    # Step 3: Create pairwise comparison matrices
    criteria = ['Jumlah Pengunjung Harian', 'Luas Bangunan (km^2)', 'Kemudahan Distribusi']
    index = [str(x) for x in range(0, len(criteria))] 
    index_list = dict(zip(index, criteria))
    num_options = len(data)
    pairwise_matrices = {}
    for criterion in criteria:

        pairwise_matrix = np.ones((num_options, num_options))
        criterion_values = data[criterion].values
        
        for i in range(num_options):
            for j in range(num_options):
                pairwise_matrix[i, j] = criterion_values[i] / criterion_values[j]
        
        pairwise_matrices[criterion] = pairwise_matrix

    # Step 4: Normalize pairwise comparison matrices
    normalized_matrices = {}

    for criterion in criteria:
        normalized_matrix = pairwise_matrices[criterion] / pairwise_matrices[criterion].sum(axis=0)
        normalized_matrices[criterion] = normalized_matrix

    # Step 5: Calculate weights for each criterion
    weights = {}

    for criterion in criteria:
        weights[criterion] = normalized_matrices[criterion].mean(axis=1)

    #step 6 Caclculate the weight with priorrity weight 
    a = pd.DataFrame(weights) 
    a['City'] = list(data['City'].unique())
    luas_bangunan = 0.0941456204614099
    jumlah_pengunjung = 0.573292204871152
    kemudahan_distribusi = 0.332562174667438
    a['probability weight'] = (a['Jumlah Pengunjung Harian'] * jumlah_pengunjung) + (a['Luas Bangunan (km^2)'] * luas_bangunan) + (a['Kemudahan Distribusi'] * kemudahan_distribusi) 
    #returning value as a dataframe
    return a
    


@api_view(['GET'])
def init(request) : 
    return Response({
        'status' : 200, 
        'data' : 'hello world', 
        'message' : "this is an initial api apps"
    }) 

@api_view(['POST']) 
def calculatespk(request) :
    data = request.FILES['file']
    df = pd.read_excel(data) 
    uploaded = df.copy()
    df = calculation(df) 
    for columns in df.columns : 
        if (columns!='probability weight') : 
            uploaded['weighted' + columns]  = df[columns]  
        else : 
            uploaded[columns] = df[columns]
    selected_city = uploaded.sort_values(by = 'probability weight', ascending=False).head(5)
    json_data = selected_city.to_json(orient='records') 
    eda = create_report(uploaded)
    # Save the report to a temporary HTML file
    with tempfile.NamedTemporaryFile(suffix='.html', delete=False) as temp_file:
        eda.save(temp_file.name)
        report_path = temp_file.name
    
    # Read the contents of the HTML file
    with open(report_path, 'r') as file:
        report_content = file.read()
    
    # Remove the temporary HTML file
    # os.remove(report_path)
    
    # Return the report content as JSON response
    return Response({
        'status' : 200, 
        'data' : {'table' : json_data,
                  'report_content': report_content},  
        'message' : "this is an initial api apps"
    }) 