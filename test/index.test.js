const nock = require('nock')
const sinon = require('sinon')
const { Probot } = require('probot')
const argocdBot = require('..')
const payload = require('./fixtures/issue_comment.created.json')

nock.disableNetConnect()

describe('argo-cd-bot', () => {
    let probot
    
    beforeEach(() => {
        probot = new Probot({})
        const app = probot.load(argocdBot)
        app.app = () => 'test'
    })

    // I'm not sure how to properly fix this
    test('diff comment posted on PR', function (done)  {
        nock('https://api.github.com')
            .post('/app/installations/2/access_tokens')
            .reply(200, {token: 'test'})
        
        const child_process = require('child_process')
        const execStub = sinon.stub(child_process, 'exec')
        execStub.returns({'stdout': 'test'})
        probot.receive({name: 'issue_comment', payload})
    })

    /*
  test('diff comment posted on multiple PR, first PR should hold the lock, preventing the second one from being diff\'d', async () => {
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, {token: 'test'})
    
    let sandbox = sinon.createSandbox()
    const child_process = require('child_process')
    sandbox.stub(child_process, 'exec').returns({'stdout': 'test'})
    await probot.receive({name: 'issue_comment', payload})

    await probot.receive({name: 'issue_comment', payload})
    sandbox.restore()
  })
  */

})
