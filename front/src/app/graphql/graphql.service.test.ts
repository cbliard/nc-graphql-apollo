import { TestBed, inject } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GraphqlService } from './graphql.service'

describe('GraphqlService', () => {
  let apollo
  let httpLink
  let inMemoryCache

  beforeEach(() => {
    apollo = mockApollo()
    httpLink = mockHttpLink()
    inMemoryCache = mockInMemoryCache()
    TestBed.configureTestingModule({
      imports: [
        HttpLinkModule,
      ],
      providers: [
        { provide: HttpLink, useValue: httpLink },
        { provide: Apollo, useValue: apollo },
        { provide: InMemoryCache, useValue: inMemoryCache },
        GraphqlService
      ]
    })
  })

  it('should be created', inject([GraphqlService], (service: GraphqlService) => {
    expect(service).toBeTruthy()
  }))

  it('should create httplink correctly', inject([GraphqlService], (service: GraphqlService) => {
    expect(httpLink.create).toHaveBeenCalledWith({ uri: '/api/graphql' })
  }))

  it('should create apollo correctly', inject([GraphqlService], (service: GraphqlService) => {
    expect(apollo.create).toHaveBeenCalledWith({link: 'APOLLO_MOCKED_RESULT', cache: inMemoryCache})
  }))
})

function mockApollo() {
  return {
    create: jest.fn()
  }
}

function mockHttpLink() {
  return {
    create: jest.fn().mockReturnValue('APOLLO_MOCKED_RESULT')
  }
}

function mockInMemoryCache() {
  return {}
}

