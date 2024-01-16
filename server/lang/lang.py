#!/bin/python3

def get_colors(hex):
    tmp = []
    for i in [0, 2, 4]:
        tmp.append(float(int(hex[i:i+2], 16)/255))
    out = 'vec4('
    for c in tmp:
        out += str(c) + ', '
    out += '1.0)'
    return out

if __name__ == '__main__':
    inst = ''
    with open('inst', 'r') as f:
        inst = f.read()
    f.close()
    inst = inst.splitlines()

    colors = {}
    for line in inst:
        if line == '':
            break
        tok = line.split(' ')
        colors[tok[0]] = get_colors(tok[2].lstrip('#'))

    inst = inst[len(colors)+1:len(inst)+1]

    frag = ''
    with open('lang_template.frag', 'r') as f:
        frag = f.read()
    f.close()

    insert = ''
    for c in colors.keys():
        insert += '\tuint ' + c + '_num;\n'
    frag = frag.replace('//BUCKETS', insert)

    insert = ''
    for c, v in colors.items():
        insert += '\t' + c + ' = ' + v + ';\n'
    frag = frag.replace('//COLORS', insert)

    insert = '\t\t\tswitch(col){\n'
    for c in colors.keys():
        insert += '\t\t\t\tcase ' + c + ':\n\t\t\t\t\t' \
                + c + '_num++;\n\t\t\t\t\tbreak;\n'
    insert += '\t\t\t}'
    frag = frag.replace('//IDENTIFY', insert)

    for line in inst:
        pass

    with open('lang.frag', 'w') as f:
        f.write(frag)
    f.close()
