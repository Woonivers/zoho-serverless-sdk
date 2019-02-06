const { Client } = require('pg')

var tokenAdministration = {}

tokenAdministration.saveOAuthTokens = async (config_obj) => {

	const client = new Client()
	await client.connect()
	await client.query('DELETE FROM ZOHO_TOKENS WHERE SCOPE=$1',['crm'])
	await client.query('INSERT INTO ZOHO_TOKENS (accesstoken,refreshtoken,expirytime,scope) VALUES ($1,$2,$3,$4) ',
		[config_obj.access_token,config_obj.refresh_token,config_obj.expires_in,'crm'])
	await client.end()
}

tokenAdministration.updateOAuthTokens = async (config_obj) => {

	const client = new Client()
	await client.connect()    
	await client.query('UPDATE ZOHO_TOKENS SET accesstoken = $1 , refreshtoken=$2, expirytime=$3, scope=$4',
		[config_obj.access_token, config_obj.refresh_token, config_obj.expires_in, 'crm'])

	await client.end()        
}

tokenAdministration.getOAuthTokens = async () => {

	// Should delete first and save after so we don't acumulate rows of expired tokens?
	const client = new Client()
	await client.connect()
	const result = await client.query('SELECT * FROM ZOHO_TOKENS WHERE SCOPE=$1',['crm'])
	await client.end()
	return result.rows
}

module.exports = tokenAdministration
