import os

app_config = {}


if os.environ.get('PYENV', 'dev') == 'production':
    pass
else:
    app_config['AUTH_ID'] = 'KQUBOeyHkrBNxInvi7EuFEIgOiZ0wm3Y'
    app_config['CLIENT_SECRET'] = \
        'YXtqaruIBr1FxHR5ZvKMcmDkV_oC9Gscdhd35g2IvAQOeBQp4_Jzz4xzkOeFx5NW'
    app_config['DOMIAN'] = 'toradar.auth0.com'
    app_config["REDIRECT_URL"] = os.environ.get("AUTH_REDIRECT", "http://localhost/callback")
