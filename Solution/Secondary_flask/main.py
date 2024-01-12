# coding: utf-8
import asyncio

from flask import Flask, render_template, send_file
from aiohttp import ClientSession, ClientResponseError
from flask import request, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO



app = Flask(__name__)
gms = pd.read_csv('../csv/games.csv')
@app.route('/generate_graph/<competition_id>')
def generate_graph(competition_id):

    # Filter the DataFrame for the specific competition ID
    filtered_gms = gms[gms['competition_id'] == competition_id]

    # Filter out data after the year 2022
    filtered_gms = filtered_gms[filtered_gms['season'].astype(int) <= 2022]

    # Group by season and calculate the sum of home and away team goals
    grouped_data = filtered_gms.groupby('season')[['home_club_goals', 'away_club_goals']].sum()

    # Use Seaborn style
    sns.set(style="whitegrid")

    # Create a figure with a higher dpi and a larger size
    plt.figure(figsize=(12, 6), dpi=200, facecolor='lightgray')  # Set facecolor to the desired background color

    # Plot the data with Seaborn
    sns.lineplot(data=grouped_data, palette=['orange', 'purple'], dashes=False)

    # Set the title, labels, and legend for the plot
    plt.title(f'Distribution of Home and Away Team Goals Over Time - {competition_id}', fontsize=16)
    plt.xlabel('Season', fontsize=12)
    plt.ylabel('Goals', fontsize=12)
    plt.legend(['Home Team Goals', 'Away Team Goals'], loc='upper left', fontsize='medium')

    # Save the plot to a BytesIO object
    img_buf = BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    plt.close()

    # Send the image file as a response
    return send_file(img_buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
