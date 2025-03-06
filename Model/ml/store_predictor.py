import json
from sklearn.cluster import DBSCAN
import numpy as np
import os
import logging

def predict_store_locations_dbscan(customer_data_file, eps=0.015, min_samples=5):
    """
    Predicts potential store locations using DBSCAN clustering.
    """
    predicted_locations_json_serializable = []

    try:
        customer_data_file_abs = os.path.abspath(customer_data_file)
        logging.info(f"Attempting to open customer data file (absolute path): {customer_data_file_abs}")
        with open(customer_data_file, 'r') as file:
            customer_data = json.load(file)

        customer_locations = []
        for customer in customer_data:
            lat = customer["Location (Latitude)"]
            lng = customer["Location (Longitude)"]
            customer_locations.append([lat, lng])

        if not customer_locations:
            logging.warning("No customer locations available.")
            return []

        X = np.array(customer_locations)

        dbscan = DBSCAN(eps=eps, min_samples=min_samples)
        dbscan.fit(X)
        labels = dbscan.labels_

        n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

        if n_clusters_ <= 0:
            logging.warning("DBSCAN found no clusters.")
            return []

        cluster_centroids = []
        unique_labels = set(labels)
        for label in unique_labels:
            if label == -1: # Noise points
                continue
            cluster_points = X[labels == label]
            centroid = np.mean(cluster_points, axis=0)
            cluster_centroids.append(centroid)

        if not cluster_centroids:
            logging.warning("No cluster centroids calculated.")
            return []


        for centroid in cluster_centroids:
            predicted_locations_json_serializable.append({
                "latitude": float(centroid[0]),
                "longitude": float(centroid[1])
            })

    except FileNotFoundError as e:
        logging.error(f"Customer data file not found: {e}")
        return []
    except Exception as e:
        logging.error(f"Error during DBSCAN clustering: {e}")
        return []

    return predicted_locations_json_serializable


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    customer_file = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        'Frontend',
        'src',
        'pages',
        'data.json'
    )
    logging.info(f"Using customer data file: {customer_file}")
    predicted_stores = predict_store_locations_dbscan(customer_file)
    logging.info(f"Predicted store locations (DBSCAN): {predicted_stores}")
    print(json.dumps(predicted_stores, indent=4))








# import json
# from sklearn.cluster import DBSCAN
# import numpy as np
# import os
# import logging

# def predict_store_locations_dbscan(customer_data_file, eps=0.01, min_samples=5):
#     """
#     Predicts potential store locations using DBSCAN clustering.
#     """
#     predicted_locations_json_serializable = []

#     try:
#         with open(customer_data_file, 'r') as file:
#             customer_data = json.load(file)

#         customer_locations = []
#         for customer in customer_data:
#             lat = customer["Location (Latitude)"]
#             lng = customer["Location (Longitude)"]
#             customer_locations.append([lat, lng])

#         if not customer_locations:
#             logging.warning("No customer locations available.")
#             return []

#         X = np.array(customer_locations)

#         dbscan = DBSCAN(eps=eps, min_samples=min_samples)
#         dbscan.fit(X)
#         labels = dbscan.labels_

#         n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

#         if n_clusters_ <= 0:
#             logging.warning("DBSCAN found no clusters.")
#             return []

#         cluster_centroids = []
#         unique_labels = set(labels)
#         for label in unique_labels:
#             if label == -1: # Noise points
#                 continue
#             cluster_points = X[labels == label]
#             centroid = np.mean(cluster_points, axis=0)
#             cluster_centroids.append(centroid)

#         if not cluster_centroids:
#             logging.warning("No cluster centroids calculated.")
#             return []


#         for centroid in cluster_centroids:
#             predicted_locations_json_serializable.append({
#                 "latitude": float(centroid[0]),
#                 "longitude": float(centroid[1])
#             })

#     except FileNotFoundError as e:
#         logging.error(f"Customer data file not found: {e}")
#         return []
#     except Exception as e:
#         logging.error(f"Error during DBSCAN clustering: {e}")
#         return []

#     return predicted_locations_json_serializable


# if __name__ == "__main__":
#     logging.basicConfig(level=logging.INFO)
#     customer_file = os.path.join(
#         os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
#         'Frontend',
#         'src',
#         'pages',
#         'data.json'
#     )
#     logging.info(f"Using customer data file: {customer_file}")
#     predicted_stores = predict_store_locations_dbscan(customer_file)
#     logging.info(f"Predicted store locations (DBSCAN): {predicted_stores}")
#     print(json.dumps(predicted_stores, indent=4))


