/* global JBrowseReactCircularGenomeView React, ReactDOM */
const { React, createRoot, createViewState, JBrowseCircularGenomeView } =
  JBrowseReactCircularGenomeView

const updates = document.getElementById('update')
const state = new createViewState({
  assembly: {
    name: 'hg19',
    aliases: ['GRCh37'],
    sequence: {
      type: 'ReferenceSequenceTrack',
      trackId: 'hg19-ReferenceSequenceTrack',
      adapter: {
        type: 'BgzipFastaAdapter',
        uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz',
      },
    },
    refNameAliases: {
      adapter: {
        type: 'RefNameAliasAdapter',
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/hg19/hg19_aliases.txt',
      },
    },
  },
  tracks: [
    {
      type: 'VariantTrack',
      trackId: 'pacbio_sv_vcf',
      name: 'HG002 Pacbio SV (VCF)',
      assemblyNames: ['hg19'],
      category: ['GIAB'],
      adapter: {
        type: 'VcfTabixAdapter',
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/hg19/pacbio/hs37d5.HG002-SequelII-CCS.bnd-only.sv.vcf.gz',
      },
    },
  ],
  defaultSession: {
    name: 'My session',
    view: {
      id: 'circularView',
      type: 'CircularView',
      bpPerPx: 5000000,
      tracks: [
        {
          id: 'uPdLKHik1',
          type: 'VariantTrack',
          configuration: 'pacbio_sv_vcf',
          displays: [
            {
              id: 'v9QVAR3oaB',
              type: 'ChordVariantDisplay',
              configuration: 'pacbio_sv_vcf-ChordVariantDisplay',
            },
          ],
        },
      ],
    },
  },
  onChange: patch => {
    updates.innerHTML += JSON.stringify(patch) + '\n'
  },
})

const textArea = document.getElementById('viewstate')
document.getElementById('showviewstate').addEventListener('click', () => {
  textArea.innerHTML = JSON.stringify(state.session.view, undefined, 2)
})

const root = createRoot(document.getElementById('jbrowse_circular_genome_view'))
root.render(
  React.createElement(JBrowseCircularGenomeView, { viewState: state }),
)
