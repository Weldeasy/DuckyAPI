import { ApiProperty } from '@nestjs/swagger'

class DnsTxt {
  @ApiProperty({
    example: 'ducky._domainkey.example.com',
    description: 'Domain name to which the TXT record should be added',
  })
  public name: string

  @ApiProperty({ example: 'v=DKIM1;t=s;p=MIGfMA0...', description: 'Value of the TXT record' })
  public value: string
}

export class DkimKey {
  @ApiProperty({ example: '59ef21aef255ed1d9d790e7a', description: 'Unique id of the DKIM key' })
  public id: string

  @ApiProperty({ example: 'example.com', description: 'The domain this DKIM key applies to' })
  public domain: string

  @ApiProperty({ example: 'ducky', description: 'DKIM selector' })
  public selector: string

  @ApiProperty({
    example: '6a:aa:d7:ba:e4:99:b4:12:e0:f3:35:01:71:d4:f1:d6:b4:95:c4:f5',
    description: 'Unique id of the DKIM key',
  })
  public fingerprint: string

  @ApiProperty({
    example: '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0...',
    description: 'Public key in DNS format (no prefix/suffix, single line)',
  })
  public publicKey: string

  @ApiProperty({ type: DnsTxt, description: 'Value for the DNS TXT record' })
  public dnsTxt: DnsTxt

  @ApiProperty({
    example: '2017-10-24T11:19:10.911Z',
    description: 'Datestring of the time the DKIM key was created',
  })
  public created: string
}
