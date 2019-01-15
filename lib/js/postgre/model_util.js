const { Client } = require('pg')

var tokenAdministration = {}

tokenAdministration.saveOAuthTokens = async (config_obj) => {

	const client = new Client()
	await client.connect()
	await client.query('TRUNCATE TABLE ZOHO_TOKENS')
	await client.query('INSERT INTO ZOHO_TOKENS (accesstoken,refreshtoken,expirytime) VALUES ($1,$2,$3) ',
		[config_obj.access_token,config_obj.refresh_token,config_obj.expires_in])
	await client.end()
}

tokenAdministration.updateOAuthTokens = async (config_obj) => {

	const client = new Client()
	await client.connect()    
	await client.query('UPDATE ZOHO_TOKENS SET accesstoken = $1 , refreshtoken=$2, expirytime=$3',
		[config_obj.access_token, config_obj.refresh_token, config_obj.expires_in])

	await client.end()        
}

tokenAdministration.getOAuthTokens = async () => {

	// Should delete first and save after so we don't acumulate rows of expired tokens?
	const client = new Client()
	await client.connect()
	const result = await client.query('SELECT * FROM ZOHO_TOKENS')
	await client.end()
	return result.rows
}

module.exports = tokenAdministration
